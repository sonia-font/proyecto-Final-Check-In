package org.ort.checkin

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Button
import android.widget.ImageView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.io.ByteArrayOutputStream
import android.util.Base64
import android.view.View
import java.util.*


class TakePhotoActivity : AppCompatActivity() {

    private val cameraRequest = 1888
    lateinit var imageView: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.take_photo)

        val btn_next = findViewById<Button>(R.id.btn_complete_register)

        if (ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_DENIED)
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), cameraRequest)

        imageView = findViewById(R.id.img_profile_picture)

        val photoButton: Button = findViewById(R.id.btn_open_camera)

        photoButton.setOnClickListener {
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            startActivityForResult(cameraIntent, cameraRequest)
            btn_next.visibility = View.VISIBLE

        }

        btn_next.setOnClickListener {
            setNextLayout()
        }
    }

    override fun onStart() {
        super.onStart()
        if(SessionVariable.Companion.finalizado){
            val layout = Intent(this, IddleActivity::class.java )
            startActivity(layout)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == cameraRequest) {

            val photoShow: Bitmap = data?.extras?.get("data") as Bitmap

            imageView.setImageBitmap(photoShow)
            println(encodeImage(photoShow))

        }
    }

    private fun encodeImage(bm: Bitmap): String? {
        val baos = ByteArrayOutputStream()
        bm.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val b: ByteArray = baos.toByteArray()
        var imgDecodableString: String = Base64.encodeToString(b, Base64.DEFAULT)
        return imgDecodableString
    }

    private fun setNextLayout() {
        val layout = Intent(this, IddleActivity::class.java )
        startActivity(layout)
    }

}