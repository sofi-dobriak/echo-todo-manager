import Button from '../Button/Button';
import { LuTimer } from 'react-icons/lu';
import { IoMdTrash } from 'react-icons/io';
import { FaPause } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';

const ActionButtons = ({
    status,
    onStart,
    onStop,
    onContinue,
    onComplete,
    onDelete,
    onShowAnalytic,
}) => {
    switch (status) {
        case 'Створено':
            return (
                <>
                    <Button onClick={onStart}>
                        <LuTimer />
                    </Button>
                    <Button onClick={onDelete}>
                        <IoMdTrash />
                    </Button>
                </>
            );

        case 'В роботі':
            return (
                <>
                    <Button onClick={onStop}>
                        <FaPause />
                    </Button>
                    <Button onClick={onComplete}>
                        <FaRegCheckCircle />
                    </Button>
                </>
            );

        case 'Зупинено':
            return (
                <>
                    <Button onClick={onContinue}>
                        <FaPlay />
                    </Button>
                    <Button onClick={onDelete}>
                        <IoMdTrash />
                    </Button>
                    <Button onClick={onShowAnalytic}>
                        <MdAnalytics />
                    </Button>
                </>
            );

        case 'Продовжено':
            return (
                <>
                    <Button onClick={onStop}>
                        <FaPause />
                    </Button>
                    <Button onClick={onComplete}>
                        <FaRegCheckCircle />
                    </Button>
                </>
            );

        case 'Завершено':
            return (
                <Button onClick={onShowAnalytic}>
                    <MdAnalytics />
                </Button>
            );

        case 'Видалено':
            return null;

        default:
            return null;
    }
};

export default ActionButtons;
