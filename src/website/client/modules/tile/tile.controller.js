/**
 * Created by dannyyassine
 */

export default TileController;
function TileController($timeout) {
    let vm = this;

    vm.isNew = true;
    vm.$onInit = $onInit;
    vm.$postLink = $postLink;

    function $onInit() {
        
    }

    function $postLink() {
        $timeout(() => {
            vm.isNew = false;
        }, 0.1, false);
    }

}

