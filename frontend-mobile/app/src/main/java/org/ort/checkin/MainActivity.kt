package org.ort.checkin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import com.google.gson.Gson
import org.ort.checkin.com.ApiService
import org.ort.checkin.com.BodyValidator
import org.ort.checkin.com.Post
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {

//    lateinit var service: ApiService
//    val TAG_LOGS = "gilbertomaterano"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val entrar      = findViewById<Button>(R.id.btn_login)
        val cod_reserva = findViewById<TextView>(R.id.text_cod_reserva).text
        val email         = findViewById<TextView>(R.id.text_email).text

        entrar.setOnClickListener{
            val layout = Intent(this, RegisterActivity::class.java )
            startActivity(layout)
        }
//
//        val retrofit: Retrofit = Retrofit.Builder()
//            .baseUrl("http://192.168.0.22:8000/api/")
//            .addConverterFactory(GsonConverterFactory.create())
//            .build()
//
//        service = retrofit.create<ApiService>(ApiService::class.java)
//
//        getAllPosts()
//        getPostById()
//        editPost()
    }

//    fun getAllPosts(){
//        //Recibimos todos los posts
//        service.getAllPosts().enqueue(object: Callback<List<Post>>{
//            override fun onResponse(call: Call<List<Post>>?, response: Response<List<Post>>?) {
//                val posts = response?.body()
//                Log.i(TAG_LOGS, Gson().toJson(posts))
//            }
//            override fun onFailure(call: Call<List<Post>>?, t: Throwable?) {
//                t?.printStackTrace()
//            }
//        })
//    }
//
//    fun getPostById(){
//        //Recibimos los datos del post con ID = 1
//        var post: Post? = null
//        service.getPostById(1).enqueue(object: Callback<Post>{
//            override fun onResponse(call: Call<Post>?, response: Response<Post>?) {
//                post = response?.body()
//                Log.i(TAG_LOGS, Gson().toJson(post))
//            }
//            override fun onFailure(call: Call<Post>?, t: Throwable?) {
//                t?.printStackTrace()
//            }
//        })
//    }

//    fun editPost(){
//        var post: BodyValidator? = BodyValidator("gaston-gp93@live.com.ar")
//        var responses: Post?
//        //Editamos los datos por POST
//        service.editPostById(0,0, post).enqueue(object: Callback<Post>{
//            override fun onResponse(call: Call<Post>?, response: Response<Post>?) {
//                responses = response?.body()
//                Log.i(TAG_LOGS, Gson().toJson(responses))
//                println(TAG_LOGS + Gson().toJson(responses))
//            }
//            override fun onFailure(call: Call<Post>?, t: Throwable?) {
//                t?.printStackTrace()
//            }
//        })
//    }
}