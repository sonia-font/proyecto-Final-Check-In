package org.ort.checkin

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import com.google.android.gms.cast.framework.media.ImagePicker


class TakePhotoActivity : AppCompatActivity() {

    var imagePicker: ImageView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.take_photo)
    }
//        imagePicker = findViewById(R.id.picker_image)
//
//        val gallery = findViewById<Button>(R.id.gallery)
//        val camera = findViewById<Button>(R.id.camera)
//
//        gallery.setOnClickListener {
//
//            ImagePicker.with(this).galleryOnly().galleryMimeTypes(arrayOf("image/*")).crop()
//                .maxResultSize(400, 400).start()
//
//        }
//
//        camera.setOnClickListener {
//
//            ImagePicker.with(this).cameraOnly().crop().maxResultSize(400, 400).start()
//
//        }
//
//    }
//
//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        super.onActivityResult(requestCode, resultCode, data)
//
//        if(resultCode== Activity.RESULT_OK && requestCode== ImagePicker.REQUEST_CODE) {
//
//
//            imagePicker?.setImageURI(data?.data)
//
//        }
//
//    }


}