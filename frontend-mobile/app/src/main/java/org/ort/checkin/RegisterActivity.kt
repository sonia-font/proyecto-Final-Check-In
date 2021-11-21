package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register)

        val siguiente      = findViewById<Button>(R.id.btn_next_register)
        val nombre = findViewById<TextView>(R.id.text_name).text
        val apellido         = findViewById<TextView>(R.id.text_last_name).text

        siguiente.setOnClickListener{
            val layout = Intent(this, RegisterTwoActivity::class.java )
            startActivity(layout)
        }
    }
}