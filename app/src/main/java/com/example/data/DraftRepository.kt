package com.example.data

import kotlinx.coroutines.flow.Flow

class DraftRepository(private val draftDao: DraftDao) {
    val allDrafts: Flow<List<DraftEntity>> = draftDao.getAllDrafts()

    suspend fun insert(draft: DraftEntity) {
        draftDao.insertDraft(draft)
    }

    suspend fun updateStatus(id: Int, status: String) {
        draftDao.updateDraftStatus(id, status)
    }

    suspend fun deleteById(id: Int) {
        draftDao.deleteDraftById(id)
    }
}
