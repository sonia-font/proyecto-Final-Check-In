package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class InfoPhotoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.info_photo)

        val siguiente      = findViewById<Button>(R.id.btn_next_register_three)

        siguiente.setOnClickListener{
            val layout = Intent(this, TakePhotoActivity::class.java )
            startActivity(layout)
        }
    }
}