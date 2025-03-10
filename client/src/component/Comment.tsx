import { UserOutlined } from '@ant-design/icons';
import { Avatar, Carousel, ConfigProvider, Rate } from 'antd';
import { useEffect, useState } from 'react';

import './Comment.css';

interface Comment {
    id: number;
    username: string;
    comment: string;
    rating: number;
    created_at: Date;
}

interface CommentProps {
    productId: number;
}

const CommentComponent = ({ productId }: CommentProps) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/comments/product/${productId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId]);

    if (comments.length === 0) {
        return <h2>Будь первым!</h2>;
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Carousel: {
                        dotWidth: '0%',
                        dotActiveWidth: '0%'
                    },
                }
            }}>
            <div>
                <Carousel arrows={comments.length > 1} autoplay>
                    {comments.map((comment) => (
                        <div key={comment.id} className='flex flex-col gap-3 bg-[#EDF2F6] p-10 max-[1444px]:p-6 max-sm:p-5'>
                            <div className='flex items-center gap-5 justify-between max-sm:flex-col max-sm:items-start'>
                                <div className='flex items-center gap-2'>
                                    <Avatar size={50} icon={<UserOutlined />} />
                                    <h1 className='font-semibold'>{comment.username}</h1>
                                    <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Rate disabled allowHalf defaultValue={comment.rating} />
                                    <p className="text-sm font-semibold text-[#838688]">({comment.rating} из 5)</p>
                                </div>
                            </div>
                            <h1 className='font-semibold'>{comment.comment}</h1>
                        </div>
                    ))}
                </Carousel>
            </div>
        </ConfigProvider>
    );
};

export default CommentComponent;
