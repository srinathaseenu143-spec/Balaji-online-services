package com.example.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "drafts")
data class DraftEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val customerName: String,
    val serviceName: String,
    val languagePreference: String, // "en" or "kn"
    val specificRequest: String,
    val status: String, // "Pending", "Completed"
    val price: Double, // e.g. 100.0
    val generatedDraft: String,
    val timestamp: Long = System.currentTimeMillis()
)
