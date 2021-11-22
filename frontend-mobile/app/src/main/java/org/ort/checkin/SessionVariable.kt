package org.ort.checkin

import android.app.Application

class SessionVariable: Application() {
    companion object {
        var sessionVar = false
    }

    override fun onCreate() {
        super.onCreate()
    }
}