var map;
var data;
var markers = [];
var currentInfoWindow = '';
//載入地圖
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: { lat: 22.9889421, lng: 120.5574008 }
  });
  //取得遠端資料並渲染
  getData();
  function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97');
    xhr.send(null);
    xhr.onload = function () {
      var str = JSON.parse(xhr.responseText)
      data = str.result.records;
      for (var i = 0; data.length > i; i++) {
        loadData(data[i].Py, data[i].Px, data[i].Picdescribe1)
        onloadlist();
        function onloadlist() {
          var alldata = data.length;
          var str = '';

          for (var i = 0; i < alldata; i++) {
            str += '<li class="scene card m-1 list-group-item" style="width:;"><span style="font-weight:bold;" class="SceneName">' + data[i].Name + '</span><div class="block"><img class="card-img-top" src="' + data[i].Picture1 + '"><div class="sceneText"><span class="Scenename">' + data[i].Name + '</span><span class="SceneZ">' + data[i].Zone + '</span></div><div class="DateIcon"></div><p class="openDate">' + data[i].Opentime + '</p><div class="AddressIcon"></div><a href="https://www.google.com.tw/maps/place/' + data[i].Py + ',' + data[i].Px + '" target="_blank">' + data[i].Add + '</a><div class="PhoneIcon"><span class="phone">' + data[i].Tel + '</span></div><div class="TagIcon"></div><span class="free">' + data[i].Ticketinfo + '</span></div></li>'
          }; list.innerHTML = str;
        };

      }
      $(document).ready(function () {
        $('.list li ').click(function (event) {
          $(this).children(".block").slideToggle();
        });
      });
    }

  }
}


// 變更地區，並進行監聽
var area = document.querySelector('.area');
area.addEventListener('change', changeArea);
function changeArea(e) {
  // 清除
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  infoWindows = [];
  // 載入
  for (var i = 0; data.length > i; i++) {
    if (data[i].Zone == e.target.value) {
      loadData(data[i].Py, data[i].Px, data[i].Picdescribe1)
    }
    else if (e.target.value == "全部") {
      for (var i = 0; data.length > i; i++) {
        loadData(data[i].Py, data[i].Px, data[i].Picdescribe1)
      }
    }
  }
}

function loadData(lat, lng, title) {
  var infowindow = new google.maps.InfoWindow({
    content: title
  });
  var marker = new google.maps.Marker({
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    title: title,
    map: map,
  });
  marker.addListener('click', function () {
    if (currentInfoWindow != '') {
      currentInfoWindow.close();
      currentInfoWindow = '';
    }
    infowindow.open(map, marker);
    currentInfoWindow = infowindow;
  });
  markers.push(marker);
}


//顯示詳細資料
var SelectZone = document.querySelector('.area');
var SubTitle = document.querySelector('.SubTitle');
var list = document.querySelector('.list');

function updatelist(e) {
  var select = e.target.value;
  var alldata = data.length;
  var str = '';


  $(document).ready(function () {
    $('.list li ').click(function (event) {
      $(this).children(".block").slideToggle();
    });
  });

  SubTitle.innerHTML = select;
  str = '';
  if (e.target.value == "全部" || e.target.value == null) {
    for (var i = 0; i < alldata; i++) {
      str += '<li class="scene card m-1 list-group-item" style="width:;"><span style="font-weight:bold;" class="SceneName ">' + data[i].Name + '</span><div class="block"><img class="card-img-top" src="' + data[i].Picture1 + '"><div class="sceneText"><span class="Scenename">' + data[i].Name + '</span><span class="SceneZ">' + data[i].Zone + '</span></div><div class="DateIcon"></div><p class="openDate">' + data[i].Opentime + '</p><div class="AddressIcon"></div><a href="https://www.google.com.tw/maps/place/' + data[i].Py + ',' + data[i].Px + '" target="_blank">' + data[i].Add + '</a><div class="PhoneIcon"><span class="phone">' + data[i].Tel + '</span></div><div class="TagIcon"></div><span class="free">' + data[i].Ticketinfo + '</span></div></li>'
    };
  }
  else {
    for (var i = 0; i < alldata; i++) {
      if (select == data[i].Zone) {
        str += '<li class="scene card m-1 list-group-item" style="width:;"><span style="font-weight:bold;" class="SceneName ">' + data[i].Name + '</span><div class="block"><img class="card-img-top" src="' + data[i].Picture1 + '"><div class="sceneText"><span class="Scenename">' + data[i].Name + '</span><span class="SceneZ">' + data[i].Zone + '</span></div><div class="DateIcon"></div><p class="openDate">' + data[i].Opentime + '</p><div class="AddressIcon"></div><a href="https://www.google.com.tw/maps/place/' + data[i].Py + ',' + data[i].Px + '" target="_blank">' + data[i].Add + '</a><div class="PhoneIcon"><span class="phone">' + data[i].Tel + '</span></div><div class="TagIcon"></div><span class="free">' + data[i].Ticketinfo + '</span></div></li>'
      };
    };
  }
  list.innerHTML = str;
};

SelectZone.addEventListener('change', updatelist, false);