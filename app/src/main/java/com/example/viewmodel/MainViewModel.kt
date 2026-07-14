package com.example.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.api.GeminiHelper
import com.example.data.AppDatabase
import com.example.data.DraftEntity
import com.example.data.DraftRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: DraftRepository
    val allDrafts: StateFlow<List<DraftEntity>>

    init {
        val draftDao = AppDatabase.getDatabase(application).draftDao()
        repository = DraftRepository(draftDao)
        allDrafts = repository.allDrafts.stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
    }

    private val _isGenerating = MutableStateFlow(false)
    val isGenerating: StateFlow<Boolean> = _isGenerating.asStateFlow()

    private val _lastGeneratedDraft = MutableStateFlow<DraftEntity?>(null)
    val lastGeneratedDraft: StateFlow<DraftEntity?> = _lastGeneratedDraft.asStateFlow()

    fun generateDraft(
        serviceName: String,
        customerName: String,
        languagePreference: String,
        specificRequest: String,
        onComplete: (DraftEntity) -> Unit
    ) {
        viewModelScope.launch {
            _isGenerating.value = true
            val draftContent = GeminiHelper.generateDraft(
                serviceName = serviceName,
                customerName = customerName,
                language = languagePreference,
                specificRequest = specificRequest
            )
            // Price: Government and Portal is ₹100, Digital Tools is ₹50
            val isGov = serviceName.contains("Aadhaar") || 
                        serviceName.contains("PAN") || 
                        serviceName.contains("Voter") || 
                        serviceName.contains("Certificate") || 
                        serviceName.contains("RTC") || 
                        serviceName.contains("ServicePlus") || 
                        serviceName.contains("Scheme") ||
                        serviceName.contains("Driving") ||
                        serviceName.contains("Insurance") ||
                        serviceName.contains("Ayushman")
            val price = if (isGov) 100.0 else 50.0

            val draftEntity = DraftEntity(
                customerName = customerName,
                serviceName = serviceName,
                languagePreference = languagePreference,
                specificRequest = specificRequest,
                status = "Pending",
                price = price,
                generatedDraft = draftContent
            )

            repository.insert(draftEntity)
            _lastGeneratedDraft.value = draftEntity
            _isGenerating.value = false
            onComplete(draftEntity)
        }
    }

    fun updateStatus(id: Int, status: String) {
        viewModelScope.launch {
            repository.updateStatus(id, status)
        }
    }

    fun deleteDraft(id: Int) {
        viewModelScope.launch {
            repository.deleteById(id)
        }
    }
}
