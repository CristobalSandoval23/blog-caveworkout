export function calcularVenc(){
    // Creas la fecha 

    var fechaExpiration = localStorage.getItem("expiration");
    var hoy = new Date();
    var fechaVto = date ('Y-m-d', strtotime ('+ '+ meses +' month', strtotime(fecha)));
    //fecha.setMonth(fecha.getMonth() + $("#meses_contrato").val());
    //$("#fecha_fin").val()=fecha.setMonth(fecha.getMonth() + $("#meses_contrato").val());
    alert(fechaVto);
    $("#fecha_fin").val(fechaVto);
  }