import Button from '../Button/Button';
import { LuTimer } from 'react-icons/lu';
import { IoMdTrash } from 'react-icons/io';
import { FaPause } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoPlay } from 'react-icons/io5';
import { FaRegChartBar } from 'react-icons/fa';

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
                        <IoPlay />
                    </Button>
                    <Button onClick={onDelete}>
                        <IoMdTrash />
                    </Button>
                    <Button onClick={onShowAnalytic}>
                        <FaRegChartBar />
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
                    <FaRegChartBar />
                </Button>
            );

        case 'Видалено':
            return null;

        default:
            return null;
    }
};

export default ActionButtons;
