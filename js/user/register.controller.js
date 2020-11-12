class registerController extends formController {}

const controller = new registerController();

$(controller.eventBtn).on('click', () => {
  controller.registerData();
});