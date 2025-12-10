import './musei_widget.css';
import './musei_widget_media.css';

import MainWidget from './components/main_widget/MainWidget';
import PhoneWidget from './components/phone_widget/PhoneWidget';



export default function MuseiWidget({ isMobile }) {
	return (
		<div className="musei_widget">
			{isMobile ? <PhoneWidget isMobile={isMobile} /> : <MainWidget isMobile={isMobile} />}
		</div>
	);
}