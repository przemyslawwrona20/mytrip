describe('ResponseStatus tests', function () {
    var ResponseStatus;

    beforeEach(module("mytrip.model.responseStatus"));

    beforeEach(inject(function (_ResponseStatus_) {

        ResponseStatus = _ResponseStatus_;

    }));

    it('should create valid successful ResponseStatus from json', function () {
        //given
        var jsonServerResponse = {status:"success", objectId:0};

        //when
        var responseStatus = ResponseStatus.apiResponseTransformer(jsonServerResponse);

        //then
        expect(responseStatus instanceof ResponseStatus).toBeTruthy();
        expect(responseStatus.objectId).toEqual(0);
        expect(responseStatus.errorMessage).toBeUndefined();
        expect(responseStatus.isSuccess()).toBeTruthy();

    });

    it('should create valid error ResponseStatus from json', function () {
        //given
        var jsonServerResponse = {statusType:"error", errorMsg: "Error from server"};

        //when
        var responseStatus = ResponseStatus.apiResponseTransformer(jsonServerResponse);

        //then
        expect(responseStatus instanceof ResponseStatus).toBeTruthy();
        expect(responseStatus.objectId).toBeUndefined();
        expect(responseStatus.errorMessage).toEqual("Error from server");
        expect(responseStatus.isSuccess()).toBeFalsy();

    });


});