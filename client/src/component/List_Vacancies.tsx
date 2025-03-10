'use client';

import { Collapse } from "antd";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

interface Vacancy {
    title: string;
    description: Record<string, string>;
    requirements: Record<string, string>;
    conditions: Record<string, string>;
}

const List_Vacancies = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    const fetchVacancies = async () => {
        try {
            const response = await fetch('http://localhost:3001/vacancies');
            const data = await response.json();
            if (Array.isArray(data)) {
                setVacancies(data);
            }
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const convertObjectToArray = (obj: Record<string, string>) => {
        return Object.values(obj);
    };

    return (
        <div>
            <Collapse accordion>
                {vacancies.map((vacancy, index) => (
                    <Panel header={vacancy.title} key={index}>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-2xl font-bold">Мы ищем тех, кто:</h3>
                            <ul className="list-disc list-inside">
                                {convertObjectToArray(vacancy.description).map((desc, i) => (
                                    <li key={i} className="text-base">{desc}</li>
                                ))}
                            </ul>
                            <h3 className="text-2xl font-bold">Требования:</h3>
                            <ul className="list-disc list-inside">
                                {convertObjectToArray(vacancy.requirements).map((req, i) => (
                                    <li key={i} className="text-base">{req}</li>
                                ))}
                            </ul>
                            <h3 className="text-2xl font-bold">Условия:</h3>
                            <ul className="list-disc list-inside">
                                {convertObjectToArray(vacancy.conditions).map((cond, i) => (
                                    <li key={i} className="text-base">{cond}</li>
                                ))}
                            </ul>
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default List_Vacancies;
