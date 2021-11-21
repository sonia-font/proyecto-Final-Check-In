package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class TakePhotoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.take_photo)

        val abrir_camara      = findViewById<Button>(R.id.btn_open_camera)

        abrir_camara.setOnClickListener{
            val layout = Intent(this, IddleActivity::class.java )
            startActivity(layout)
        }
    }
}