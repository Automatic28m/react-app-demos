import { Typography } from "antd"
import css from './Card.module.css';

function Card(props) {

    const { Text } = Typography;

    const { title, children } = props;
    return (
        <div className={css.card}>
            {title && (
                <Text strong>
                    {title}
                </Text>
            )}
            {children}
        </div>
    )
}

export default Card;