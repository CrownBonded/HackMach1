angular.module('vzMach')
    .factory('vzService', ['$http', '$q', '$localStorage', function ($http, $q, localStorage) {

        var zipcode = "";
        var type = "";
        return {
            getRecommendPlans: function (zipcode) {
                var deferred = $q.defer();
                $http.get('WebApi/Mach/GetRecommendPlans?zipcode=' + zipcode)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getIP: function () {
                var deferred = $q.defer();
                $http.get('http://ipinfo.io')
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getStateCode: function (state)
            {
                if (state == "Texas")
                {
                    return 'TX';
                }
                if (state == "Pennsylvania")
                {
                    return 'PA';
                }
                if (state == "Virginia") {
                    return 'VA';
                }
                if (state == "Maryland") {
                    return 'MA';
                }
                if (state == "Newyork") {
                    return 'NY';
                }
                if (state == "Delaware") {
                    return 'DE';
                }
                if (state == "Newjersey") {
                    return 'NJ';
                }
                if (state == 'Massachusetts') {
                    return "MA";
                }
            },
            setZipcode: function (zip) {
                localStorage.zipcode = zip;
            },
            setCity: function (city) {
                localStorage.city = city;
            },
            getZipcode: function () {
                return localStorage.zipcode;
            },
            getCity: function () {
                return localStorage.city;
            },
            getZipDetails: function (zipcode) {
                var deferred = $q.defer();
                $http.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDv3C6QeG-HTHEQwLg6Z5b_oLYH1ax5KaI&address=" + zipcode + "&sensor=true")
                   .success(function (data) {
                       var result = {};
                       result.city = data.results[0].address_components[1].short_name;
                       var stateObj = _.filter(data.results[0].address_components, function (o) {
                           return o.types[0] == "administrative_area_level_1";
                       });
                       result.state = stateObj[0].short_name;
                       deferred.resolve(result);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getAllPlans: function (type) {
                var deferred = $q.defer();
                $http.get('WebApi/Mach/GetAllBundlesByType?type=' + type)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getCart: function (type) {
                var deferred = $q.defer();
                $http.get('WebApi/Mach/GetCart')
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            UpdateCart: function (BundleId) {
                var deferred = $q.defer();
                $http.get('WebApi/Mach/UpdateCart?BundleId=' + BundleId)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            },
            UpdateAddress: function (obj) {
                var deferred = $q.defer();
                $http.get('WebApi/Mach/UpdateAddress/Address' + obj)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
    //        var data = $.param({
    //        fName: $scope.firstName,
    //        lName: $scope.lastName
    //});
        
    //var config = {
    //    headers : {
    //        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //    }
    //}

    //$http.post('/ServerRequest/PostDataResponse', data, config)
    //.success(function (data, status, headers, config) {
    //   
    //})
    //.error(function (data, status, header, config) {
    //   
    //});

        }

           

        
    }]);