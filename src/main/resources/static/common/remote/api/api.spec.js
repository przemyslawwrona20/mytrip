//describe('Api tests', function () {
//    var API, UserAuthService, $httpBackend;
//
//    beforeEach(module("cnt_stash.remote.api"));
//
//    beforeEach(inject(function (_API_, _UserAuthService_, _$httpBackend_) {
//        API = _API_;
//        UserAuthService = _UserAuthService_;
//        $httpBackend = _$httpBackend_;
//    }));
//
//    it('should create authenticated GET request without params', function () {
//        //given
//        var response = null;
//        $httpBackend.expectGET('auth/api/test').respond(200, 'OK');
//
//        //when
//        API.get('/test').then(function(data){
//            response = data;
//        });
//        $httpBackend.flush();
//
//        //then
//        expect(response).toEqual("OK");
//    });
//
//    it('should create authenticated GET request with params', function () {
//        //given
//        var response = null;
//        $httpBackend.expectGET('auth/api/test?param=1').respond(200, 'OK');
//
//        //when
//        API.get('/test', {param: 1}).then(function(data){
//            response = data;
//        });
//        $httpBackend.flush();
//
//        //then
//        expect(response).toEqual("OK");
//    });
//
//    it('should create authenticated POST request without params', function () {
//        //given
//        var response = null;
//        $httpBackend.expectPOST('auth/api/test').respond(200, 'OK');
//
//        //when
//        API.post('/test').then(function(data){
//            response = data;
//        });
//        $httpBackend.flush();
//
//        //then
//        expect(response).toEqual("OK");
//    });
//
//
//    it('should create authenticated POST request with params', function () {
//        //given
//        var response = null;
//        $httpBackend.expectPOST('auth/api/test?param=1').respond(200, 'OK');
//
//        //when
//        API.post('/test',{}, {param:1}).then(function(data){
//            response = data;
//        });
//        $httpBackend.flush();
//
//        //then
//        expect(response).toEqual("OK");
//    });
//
//    it('should create authenticated POST request with data and params', function () {
//        //given
//        var response = null;
//        $httpBackend.expectPOST('auth/api/test?param=1', {message: "test"}).respond(200, 'OK');
//
//        //when
//        API.post('/test', {message: "test"} , {param: 1}).then(function(data){
//            response = data;
//        });
//        $httpBackend.flush();
//
//        //then
//        expect(response).toEqual("OK");
//    });
//
//
//});