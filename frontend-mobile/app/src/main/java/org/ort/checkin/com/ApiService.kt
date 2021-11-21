package org.ort.checkin.com

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path


interface ApiService {

//    @GET("posts/")
//    fun getAllPosts(): Call<List<Post>>
//
//    @GET("posts/{id}")
//    fun getPostById(@Path("id") id: Int): Call<Post>

    @POST("{idHotel}/{codReserva}/validar")
    fun editPostById(@Path("idHotel") id: Int, @Path("codReserva") codReserva: Int, @Body post: BodyValidator?): Call<Post>
}