package com.example.api

import com.example.BuildConfig
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Query
import java.util.concurrent.TimeUnit

@JsonClass(generateAdapter = true)
data class Part(
    @Json(name = "text") val text: String? = null
)

@JsonClass(generateAdapter = true)
data class Content(
    @Json(name = "parts") val parts: List<Part>
)

@JsonClass(generateAdapter = true)
data class GenerateContentRequest(
    @Json(name = "contents") val contents: List<Content>,
    @Json(name = "systemInstruction") val systemInstruction: Content? = null
)

@JsonClass(generateAdapter = true)
data class Candidate(
    @Json(name = "content") val content: Content? = null
)

@JsonClass(generateAdapter = true)
data class GenerateContentResponse(
    @Json(name = "candidates") val candidates: List<Candidate>? = null
)

interface GeminiApiService {
    @POST("v1beta/models/gemini-3.5-flash:generateContent")
    suspend fun generateContent(
        @Query("key") apiKey: String,
        @Body request: GenerateContentRequest
    ): GenerateContentResponse
}

object RetrofitClient {
    private const val BASE_URL = "https://generativelanguage.googleapis.com/"

    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    val service: GeminiApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(GeminiApiService::class.java)
    }
}

object GeminiHelper {
    suspend fun generateDraft(serviceName: String, customerName: String, language: String, specificRequest: String): String {
        val apiKey = BuildConfig.GEMINI_API_KEY
        if (apiKey.isEmpty() || apiKey == "MY_GEMINI_API_KEY") {
            return generateOfflineFallback(serviceName, customerName, language, specificRequest)
        }

        val prompt = """
            Generate an official digital draft/template for the following service request:
            Service Name: $serviceName
            Customer Name: $customerName
            Language Preference: ${if (language == "kn") "Kannada" else "English"}
            Customer Reference / Specific Instructions: $specificRequest
            
            Please make sure the draft looks highly professional, formal, complete with placeholders if needed, and corresponds exactly to Indian administrative/legal/corporate standards.
            If the language preference is Kannada (kn), please write the primary body content of the draft/document in Kannada.
        """.trimIndent()

        val systemPrompt = "You are Balaji, an expert advisor and operator of Balaji Online Services, a premium civic center in India. You create flawless, legally robust, highly detailed templates, letters, applications, and documents for citizens."

        val request = GenerateContentRequest(
            contents = listOf(Content(parts = listOf(Part(text = prompt)))),
            systemInstruction = Content(parts = listOf(Part(text = systemPrompt)))
        )

        return try {
            val response = RetrofitClient.service.generateContent(apiKey, request)
            response.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text 
                ?: generateOfflineFallback(serviceName, customerName, language, specificRequest)
        } catch (e: Exception) {
            e.printStackTrace()
            // Graceful offline fallback in case of no network / invalid API key
            generateOfflineFallback(serviceName, customerName, language, specificRequest) + "\n\n(Generated in Offline Mode - API connection unsuccessful: ${e.localizedMessage})"
        }
    }

    private fun generateOfflineFallback(serviceName: String, customerName: String, language: String, specificRequest: String): String {
        val isKannada = language == "kn"
        val today = java.text.SimpleDateFormat("dd-MM-yyyy", java.util.Locale.getDefault()).format(java.util.Date())
        
        return if (isKannada) {
            """
            |---------------------------------------------------------
            | ಬಾಲಾಜಿ ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು - ಅಧಿಕೃತ ಕರಡು ಪ್ರತಿ
            | ದಿನಾಂಕ: $today
            |---------------------------------------------------------
            | ಸೇವೆ: $serviceName
            | ಗ್ರಾಹಕರ ಹೆಸರು: $customerName
            | ಭಾಷಾ ಆದ್ಯತೆ: ಕನ್ನಡ
            | ಉಲ್ಲೇಖ / ವಿವರಗಳು: $specificRequest
            |
            | ಗೌರವಾನ್ವಿತ ಅಧಿಕಾರಿಗಳಿಗೆ,
            | 
            | ವಿಷಯ: $serviceName ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ.
            | 
            | ಅರ್ಜಿದಾರರಾದ ನಾನು ($customerName) ಈ ಮೂಲಕ ವಿನಂತಿಸುವುದೇನೆಂದರೆ, ನನ್ನ ಮೇಲಿನ ಉಲ್ಲೇಖಿತ ಸೇವೆಗೆ ಸಂಬಂಧಿಸಿದ ವಿವರಗಳನ್ನು ಸರಿಪಡಿಸಲು / ಹೊಸದಾಗಿ ನೋಂದಾಯಿಸಲು ವಿನಂತಿಸುತ್ತೇನೆ. ಇದಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಪೂರಕ ದಾಖಲೆಗಳನ್ನು ಇದರೊಂದಿಗೆ ಲಗತ್ತಿಸಲಾಗಿದೆ.
            | 
            | ನಿರ್ದಿಷ್ಟ ವಿವರಗಳು:
            | $specificRequest
            | 
            | ದಯವಿಟ್ಟು ನನ್ನ ಅರ್ಜಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಸೂಕ್ತ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾಗಿ ವಿನಂತಿ.
            | 
            | ಧನ್ಯವಾದಗಳೊಂದಿಗೆ,
            | 
            | ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ,
            | $customerName
            |---------------------------------------------------------
            """.trimMargin()
        } else {
            """
            |---------------------------------------------------------
            | BALAJI ONLINE SERVICES - OFFICIAL DOCUMENT DRAFT
            | Date: $today
            |---------------------------------------------------------
            | Service: $serviceName
            | Customer Name: $customerName
            | Language: English
            | Reference / Request: $specificRequest
            |
            | TO WHOMSOEVER IT MAY CONCERN / THE CONCERNED AUTHORITY,
            |
            | Subject: Application regarding $serviceName
            |
            | I, $customerName, am submitting this draft application in support of my request for $serviceName. 
            | The relevant proof documents and credentials are attached herewith for verification.
            |
            | Specific Request / Information Provided:
            | $specificRequest
            |
            | Kindly process this application at the earliest. I hereby declare that all information provided above is true to the best of my knowledge.
            |
            | Yours sincerely,
            |
            | $customerName
            | (Applicant Signature)
            |---------------------------------------------------------
            """.trimMargin()
        }
    }
}
