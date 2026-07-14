package com.example.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface DraftDao {
    @Query("SELECT * FROM drafts ORDER BY timestamp DESC")
    fun getAllDrafts(): Flow<List<DraftEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertDraft(draft: DraftEntity)

    @Query("UPDATE drafts SET status = :status WHERE id = :id")
    suspend fun updateDraftStatus(id: Int, status: String)

    @Query("DELETE FROM drafts WHERE id = :id")
    suspend fun deleteDraftById(id: Int)
}
