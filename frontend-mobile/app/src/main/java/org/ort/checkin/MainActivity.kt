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
        if(sessionVar) {
            setNextLayout()
        }
    }

    private fun clickEntrar(btn: Button) {

        btn.setOnClickListener{

            val cod_reserva = findViewById<TextView>(R.id.text_cod_reserva).text
            val email         = findViewById<TextView>(R.id.text_email).text

            if(!email.isEmpty() && !email.isNullOrEmpty()) {

                validarUser(email.toString(), cod_reserva.toString().toInt())

                if(true) {
                    setNextLayout()
                }else {
                    err.visibility = View.VISIBLE
                    err.text = "no hemos podido validar sus datos"
                }

            } else {
                err.visibility = View.VISIBLE
                err.text = "Tiene que llenar ambos campos"
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

}