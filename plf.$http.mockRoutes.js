(function () {
    'use strict';

    angular.module('plf').run([
        'routeMocks', function (routeMocks) {
            routeMocks.get['/api/people/1'] = {
                firstName: 'John',
                lastName: 'Smith'
            };
        }
    ]);
}());