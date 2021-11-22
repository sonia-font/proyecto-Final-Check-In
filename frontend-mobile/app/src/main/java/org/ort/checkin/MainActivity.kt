package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.delay
import org.ort.checkin.com.ConectionApi
import org.ort.checkin.SessionVariable.Companion.sessionVar
import java.lang.NumberFormatException

class MainActivity : AppCompatActivity() {

    lateinit var err: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val entrar = findViewById<Button>(R.id.btn_login)

        err = findViewById<TextView>(R.id.text_error_login)
        err.visibility = View.INVISIBLE

        clickEntrar(entrar)
    }



    override fun onStart() {
        super.onStart()
        if(SessionVariable.Companion.finalizado){
            val layout = Intent(this, IddleActivity::class.java )
            startActivity(layout)
        }else{
            if(sessionVar) {
                setNextLayout()
            }
        }
    }

    private fun clickEntrar(btn: Button) {

        btn.setOnClickListener{

            val cod_reserva = findViewById<TextView>(R.id.text_cod_reserva).text
            val email         = findViewById<TextView>(R.id.text_email).text

            if(!email.isEmpty() && !cod_reserva.isNullOrEmpty()) {

                if(isNumeric(email.toString()) ||  !isNumeric(cod_reserva.toString())) {
                    err.visibility = View.VISIBLE
                    err.text = getString(R.string.error_data)
                }else {
                    validarUser(email.toString(), cod_reserva.toString().toInt())

                    if(sessionVar) {
                        setNextLayout()
                    }else {
                        err.visibility = View.VISIBLE
                        err.text = getString(R.string.error_data_invalid)
                    }
                }

            } else {
                err.visibility = View.VISIBLE
                err.text = getString(R.string.error_empty)
            }
        }
    }

    private fun validarUser(email: String, cod_reserva: Int) {
        val conn = ConectionApi()
        conn.validateUser(email, cod_reserva)
    }

    private fun setNextLayout() {
        val layout = Intent(this, RegisterActivity::class.java )
        startActivity(layout)
    }

    private fun isNumeric(cadena: String): Boolean {
        val resultado: Boolean = try {
            cadena.toInt()
            true
        } catch (excepcion: NumberFormatException) {
            false
        }
        return resultado
    }
}