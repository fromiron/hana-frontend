import {Player} from '@lottiefiles/react-lottie-player';
import loadingAnimation from '@/public/lottile/loading_animation.json';

// TODO react-lottie-playerのバグがFixされたらバージョンアップ
// react 18 and strict mode duplicates animation issue
// https://github.com/LottieFiles/lottie-react/issues/92

export default function LoadIndicator() {

    return <div className={'w-full h-full flex flex-col justify-center'}>
        <Player
        autoplay
        loop
        src={loadingAnimation}
        style={
            {
                backgroundColor:'#f6f6f6',
                borderRadius: '0.25rem',
                width: '100%',
                height: '100%',
                maxWidth:'300px',
                maxHeight:'300px',
            }
        }
    />
    </div>
}