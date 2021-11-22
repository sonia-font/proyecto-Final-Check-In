package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.Spinner
import android.widget.TextView
import java.lang.NumberFormatException

class RegisterActivity : AppCompatActivity() {

    private lateinit var err: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register)

        val siguiente      = findViewById<Button>(R.id.btn_next_register)
        val spinner = findViewById<Spinner>(R.id.spinner_type_document)
        val tipos_docs = resources.getStringArray(R.array.tipo_document)


        if (spinner != null) {
            val adapter = ArrayAdapter(this,
                android.R.layout.simple_spinner_item, tipos_docs)
            spinner.adapter = adapter
        }

        err = findViewById<TextView>(R.id.text_error_register)
        err.visibility = View.INVISIBLE

        clickSiguiente(siguiente, spinner)

    }

    override fun onStart() {
        super.onStart()
        if(SessionVariable.Companion.finalizado){
            val layout = Intent(this, IddleActivity::class.java )
            startActivity(layout)
        }
    }

    private fun clickSiguiente(btn: Button, spinner: Spinner) {
        btn.setOnClickListener{
            val tipo   =  spinner.getSelectedItem().toString()
            val numero = findViewById<TextView>(R.id.text_document_number).text

            if(tipo.isNotEmpty() && numero.isNotEmpty()) {

                if(isNumeric(tipo) || !isNumeric(numero.toString())) {
                    err.visibility = View.VISIBLE
                    err.text = getString(R.string.error_data)
                }else{
                    setNextLayout(tipo, numero.toString().toInt())
                }

            }else {
                err.visibility = View.VISIBLE
                err.text = getString(R.string.error_empty)
            }
        }
    }

    private fun setNextLayout(tipo: String, numero: Int) {
        val layout = Intent(this,  InfoPhotoActivity::class.java )
        layout.putExtra("tipo", tipo);
        layout.putExtra("numero", numero);
        startActivity(layout)
    }

    private fun isNumeric(cadena: String): Boolean {
        val resultado: Boolean = try {
            cadena.toBigInteger()
            true
        } catch (excepcion: NumberFormatException) {
            false
        }
        return resultado
    }
}