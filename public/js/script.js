/*
$(document).ready(function(){
         $("#demo").change(function () {
            $("#comuna option:selected").each(function () {
            elegido=$(this).val();
            $.post("comuna1.php", { elegido: elegido }, function(data){
            $("#barrio").html(data);
            });     
            });
         })
      });
*/

$(document).ready(function(){
         $("#demo").click(function () {
         	$("#listar").html("imprime en este espacio");
            $.post("/listar", { }, function(data){
            $("#listar").html(data);
            });     
            });
      });

