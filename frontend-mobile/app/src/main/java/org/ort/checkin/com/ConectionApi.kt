package org.ort.checkin.com

import com.google.gson.Gson
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import org.ort.checkin.SessionVariable.Companion.sessionVar

class ConectionApi {


    lateinit var service: ApiService
    var saveRes: Boolean = false

    constructor(){
        connect()
    }

    fun connect() {
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.0.22:8000/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        service = retrofit.create<ApiService>(ApiService::class.java)
    }

    fun validateUser(email: String, cod_reserva: Int) {
        var post: BodyValidator? = BodyValidator(email)
        var responses: Post?

        service.validarUsuarioByEmailYCod(0, cod_reserva, post).enqueue(object : Callback<Post> {
            override fun onResponse(call: Call<Post>?, response: Response<Post>?) {
                responses = response?.body()
                sessionVar = responses != null
                println("gm****************************" + Gson().toJson(responses))
            }

            override fun onFailure(call: Call<Post>?, t: Throwable?) {
                println("porerror******")
            }
        })
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