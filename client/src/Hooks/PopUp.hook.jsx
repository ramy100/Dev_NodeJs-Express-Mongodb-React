import Swal from "sweetalert2";

const usePopUp = ({
  toast = false,
  position = "center",
  timer = 3000,
  timerProgressBar = true,
  showConfirmButton = false,
} = {}) => {
  const popUpConfig = {
    toast,
    position,
    showConfirmButton,
    timer,
    timerProgressBar,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  };

  const PopUp = Swal.mixin(popUpConfig);

  return PopUp;
};

export default usePopUp;
