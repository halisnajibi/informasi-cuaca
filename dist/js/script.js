function waktu() {
  var months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum&#39;at",
    "Sabtu",
  ];

  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth();
  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];
  var yy = date.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  tanggal = thisDay + "," + day + " " + months[month] + " " + year;
  return tanggal;
}

function getData(q = null) {
  if (q == null) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather",
      type: "get",
      dataType: "json",
      data: {
        q: "banjarmasin",
        appid: "9620fd6c3bd22a467227c61d76819c11",
        units: "metric",
        lang: "id",
      },
      success: function (response) {
        setDataDefault(response);
      },
    });
  } else {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather",
      type: "get",
      dataType: "json",
      data: {
        q: q,
        appid: "9620fd6c3bd22a467227c61d76819c11",
        units: "metric",
        lang: "id",
      },
      success: function (response) {
        setDataKey(response);
      },
    });
  }
}

function setDataDefault(result) {
  let tanggal = waktu();
  $("#tanggal").html(tanggal);
  let sys = result.sys;
  let coord = result.coord;
  let main = result.main;
  let weather = result.weather[0];
  let wind = result.wind;
  let clouds = result.clouds;
  let iconHref = "http://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
  // membuat sunrise dan sunset
  var theDate = new Date(sys.sunrise * 1000);
  sunrise = theDate.toGMTString();
  var ss = new Date(sys.sunset * 1000);
  sunset = ss.toGMTString();
  // rubah  html
  $("#matahari").html(
    `  
   <div class="flex flex-wrap">
   <h6 class="text-sm text-slate-200 font-medium mt-2">
   Terbit ` +
      sunrise +
      `
 </h6>
 <h6 class="text-sm text-slate-200 font-medium mt-2">
 Terbenam ` +
      sunset +
      `
</h6>
   </div>`
  );
  $("#celcius").html(
    main.temp + `<span class="text-3xl text-slate-300 font-normal">C</span>`
  );
  $("#icon").attr("src", iconHref);
  $("#kondisi").html(weather.description);
  $("#suhu").html(`Suhu <span class="font-medium">` + main.temp + ` c</span>`);
  $("#angin").html(
    `Angin <span class="font-medium">` + wind.speed + ` m/s</span>`
  );
  $("#awan").html(`Awan <span class="font-medium">` + clouds.all + ` %</span>`);
  $("#koordinat").html(
    ` Koordinat <span class="font-medium">[Lon=` +
      coord.lon +
      ` - Lat=` +
      coord.lat +
      `]</span>`
  );
}

function setDataKey(result) {
  let tanggal = waktu();
  $("#tanggal").html(tanggal);
  let sys = result.sys;
  let coord = result.coord;
  let main = result.main;
  let weather = result.weather[0];
  let wind = result.wind;
  let clouds = result.clouds;
  let iconHref = "http://openweathermap.org/img/wn/" + weather.icon + "@2x.png";

  // membuat sunrise dan sunset
  var theDate = new Date(sys.sunrise * 1000);
  sunrise = theDate.toGMTString();
  var ss = new Date(sys.sunset * 1000);
  sunset = ss.toGMTString();
  // rubah  html
  $("#matahari").html(
    `  
    <div class="flex flex-wrap">
    <h6 class="text-sm text-slate-200 font-medium mt-2">
    Terbit ` +
      sunrise +
      `
  </h6>
  <h6 class="text-sm text-slate-200 font-medium mt-2">
  Terbenam ` +
      sunset +
      `
</h6>
    </div>`
  );
  $("#celcius").html(
    main.temp + `<span class="text-3xl text-slate-300 font-normal">C</span>`
  );
  $("#lokasi").html(result.name + `,` + sys.country);
  $("#icon").attr("src", iconHref);
  $("#kondisi").html(weather.description);
  $("#suhu").html(`Suhu <span class="font-medium">` + main.temp + ` c</span>`);
  $("#angin").html(
    `Angin <span class="font-medium">` + wind.speed + ` m/s</span>`
  );
  $("#awan").html(`Awan <span class="font-medium">` + clouds.all + ` %</span>`);
  $("#koordinat").html(
    ` Koordinat <span class="font-medium">[Lon=` +
      coord.lon +
      ` - Lat=` +
      coord.lat +
      `]</span>`
  );
}
getData();
$("#tombol-cari").on("click", function () {
  let input = $("#input").val();
  getData(input);
});
// let sdasd = new Date(1675808926);
// console.log(sdasd);

// console.log(dateString);

// var time = moment(1675808926).format("DD-MM-YYYY h:mm:ss");
// console.log(time);
