angular.module('orderCloud')
    .controller('SecurityCtrl', SecurityController)
;

function SecurityController($exceptionHandler, $stateParams, toastr, Assignments, AvailableProfiles, sdkOrderCloud) {
    var vm = this;
    vm.assignments = Assignments;
    vm.profiles = AvailableProfiles;
    vm.buyerid = $stateParams.buyerid;
    vm.usergroupid = $stateParams.usergroupid;
    vm.adminusergroupid = $stateParams.adminusergroupid;

    vm.updateAssignment = function(scope) {
        if (scope.profile.selected) {
            var assignment = {
                securityProfileID: scope.profile.ID,
                buyerID: $stateParams.buyerid,
                userGroupID: $stateParams.usergroupid || $stateParams.adminusergroupid
            }
            sdkOrderCloud.SecurityProfiles.SaveAssignment(assignment)
                .then(function() {
                    toastr.success(scope.profile.Name + ' was enabled.');
                })
                .catch(function(ex) {
                    scope.profile.selected = false;
                    $exceptionHandler(ex);
                });
        } else {
            var options = {
                buyerID: $stateParams.buyerid,
                userGroupID: $stateParams.usergroupid || $stateParams.adminusergroupid
            };
            sdkOrderCloud.SecurityProfiles.DeleteAssignment(scope.profile.ID, options)
                .then(function() {
                    toastr.success(scope.profile.Name + ' was disabled.');
                })
                .catch(function(ex) {
                    scope.profile.selected = true;
                    $exceptionHandler(ex);
                });
        }
    }
}
