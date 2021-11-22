package org.ort.checkin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class IddleActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.iddle)

        SessionVariable.Companion.finalizado = true
    }
}