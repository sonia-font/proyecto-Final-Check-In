package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView

class RegisterActivity : AppCompatActivity() {

    private lateinit var err: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register)

        val siguiente      = findViewById<Button>(R.id.btn_next_register)

        err = findViewById<TextView>(R.id.text_error_register)
        err.visibility = View.INVISIBLE

        clickSiguiente(siguiente)

    }

    private fun clickSiguiente(btn: Button) {
        btn.setOnClickListener{
            val tipo   = findViewById<TextView>(R.id.text_document_type).text
            val numero = findViewById<TextView>(R.id.text_document_number).text

            if(tipo.isNotEmpty() && numero.isNotEmpty()) {

                setNextLayout(tipo.toString(), numero.toString().toInt())
            }else {
                err.visibility = View.VISIBLE
                err.text = "llenar los dos campos por favor"
            }
        }
    }

    private fun setNextLayout(tipo: String, numero: Int) {
        val layout = Intent(this,  InfoPhotoActivity::class.java )
        layout.putExtra("tipo", tipo);
        layout.putExtra("numero", numero);
        startActivity(layout)
    }
}