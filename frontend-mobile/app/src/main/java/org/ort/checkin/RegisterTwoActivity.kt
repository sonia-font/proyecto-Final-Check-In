package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class RegisterTwoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register_two)

        val siguiente      = findViewById<Button>(R.id.btn_next_register_two)
        val tipo = findViewById<TextView>(R.id.text_type_document).text
        val numero         = findViewById<TextView>(R.id.text_number_document).text

        siguiente.setOnClickListener{
            val layout = Intent(this, InfoPhotoActivity::class.java )
            startActivity(layout)
        }
    }
}