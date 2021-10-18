# Proyecto Final ORT // Check-In

La aplicación va a permitir a huespedes de un hotel realizar un check in para agilizar el proceso de otorgarle una habitación.
Cuenta con una base de datos de placeholder de un Hotel ficticio, un backend que permite conectar con esa DB, un front end para mostrar los datos del huesped al empleado del Hotel, y una app mobile para hacer el check in.

**Alcance**
Realizar una aplicación mobile que permite a un futuro huésped de un hotel (ambos deberían ser de prueba) loguearse con su número de reserva, nombre y apellido, y le solicite una foto y muestre una revisión de los datos dentro de lo que se incluye la hora del check-in y la ubicación para enviar a GMaps.
Realizar una aplicación web que envíe a los clientes un mail para realizar el check in 24 hs antes de su ingreso. Dicha aplicación también va a permitir a un empleado de hotel ingresar el número de reserva con el fin de mostrar los datos del huésped y su foto previamente subida. Una vez que el huésped se presenta, se envía por notificación el número de habitación, contraseña de Wifi y horarios de comida.
Armar un semáforo dentro de la aplicación web utilizando Fiwire que indique el estado de las reservas. En verde si el huesped hizo el checkin, en amarillo si aun falta hacerlo  y en rojo si se canceló la reserva.

**Elementos que se asumen**
Se asume que la fecha y hora del registro y/o reserva  es con el huso horario del respectivo hotel
Notificaciones con temporizador usarán la hora y fecha del hotel

**Límites de proyecto**
El proyecto comprende desde que el huésped es requerido para hacer el check-in, hasta la notificación por parte de la app para que el huésped vaya a recepción a hacer el check-out.
_No comprende_: El pago por el hospedaje ni cargos extras. La asignación de la habitación del huésped o cualquier logística del hotel, solo se harán consultas a su base de datos. Validación y/o cruce con sistemas que validan la identidad de la persona (RENAPER o similares).
