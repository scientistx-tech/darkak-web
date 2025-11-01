import { auth, provider, signInWithPopup, fbProvider } from '@/utils/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { convertFirebaseToAppUser } from '@/utils/convertFirebaseUser';
import { FaGoogle, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { useUserGoogleAuthenticationMutation, useGetUserQuery, useUserFacebookAuthenticationMutation } from '@/redux/services/authApis';
import { MdEmail } from 'react-icons/md';

interface SocialButtonProps {
  signUpMedium: string;
  setSignUpMedium: (medium: string) => void;
}

const SocialButton = ({ signUpMedium, setSignUpMedium }: SocialButtonProps) => {
  const dispatch = useDispatch();
  const [userGoogleAuthentication] = useUserGoogleAuthenticationMutation();
  const [userFacebookAuthentication] = useUserFacebookAuthenticationMutation();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      const userValue = await userGoogleAuthentication({
        token: firebaseToken,
        name: user.displayName || 'Unknown User',
      }).unwrap();

      toast.success('Google login successful!');
      dispatch(setUser(userValue));
    } catch (error: any) {
      toast.error('Google login failed!');
      console.error(error);
    }
  };


  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      const userValue = await userFacebookAuthentication({
        token: firebaseToken,
        name: user.displayName || 'Unknown User',
      }).unwrap();

      toast.success('Facebook login successful!');
      dispatch(setUser(userValue));
    } catch (error: any) {
      toast.error('Facebook login failed!');
      console.error(error);
    }
  };

  const handlePhoneLogin = () => {
    // toast.info('Phone login not implemented yet.');
    if (signUpMedium === 'phone') {
      setSignUpMedium('email');
    } else {
      setSignUpMedium('phone');
    }
  };

  const buttonData = [
    {
      text: 'LOGIN WITH GOOGLE',
      color: 'bg-[#DB4437] hover:bg-[#c5392f]',
      icon: <FaGoogle size={20} />,
      onClick: handleGoogleLogin,
    },
    {
      text: 'LOGIN WITH FACEBOOK',
      color: 'bg-[#3b5998] hover:bg-[#2d4373]',
      icon: <FaFacebookF size={20} />,
      onClick: handleFacebookLogin,
    },
    {
      text: `LOGIN WITH ${signUpMedium === 'phone' ? 'EMAIL' : 'PHONE'}`,
      color: 'bg-[#34A853] hover:bg-[#2e8b47]',
      icon: signUpMedium === 'email' ? <FaPhoneAlt size={20} /> : <MdEmail size={20} />,
      onClick: handlePhoneLogin,
    },
  ];

  return (
    <div className="my-6 flex flex-col items-center gap-4">
      {buttonData.map(({ text, color, icon, onClick }, index) => (
        <button
          key={index}
          onClick={onClick}
          className={`flex w-[80%] items-center justify-start rounded-md text-sm font-semibold text-white shadow-md transition duration-300 ${color}`}
        >
          <div className="border-r-2 border-white px-6 py-3">
            <span>{icon}</span>
          </div>

          <div className="px-6 py-3">
            <span>{text}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SocialButton;
