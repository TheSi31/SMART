'use client';

import { Breadcrumb } from 'antd';

interface Props {
    name: string;
    url?: string;
}

interface BreacdProps {
    items: Props[];
}

const Breacd = ({ items }: BreacdProps) => {
    return (
        <div className='w-4/5 max-lg:w-full max-lg:p-5 pt-5 flex items-start'>
            <Breadcrumb>
                {items.map((item) => (
                    <Breadcrumb.Item href={item.url}>
                        {item.name}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    );
};

export default Breacd;
