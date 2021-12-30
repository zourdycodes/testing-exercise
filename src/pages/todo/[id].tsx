import * as React from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';

import { BeautifulRouter } from '../../components/router/Router';

interface ITodo {
  id: number;
  title: string;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export interface IProps {
  todo: ITodo;
}

function TodoPage({ todo }: IProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BeautifulRouter />

      <div>Todo Title: {todo.title}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const { id } = context.params as IParams;

  const todoResponse = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id.toString()}`
  );
  const todo = (await todoResponse.json()) as ITodo;

  return { props: { todo }, revalidate: 20 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allTodosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/todos`
  );

  const allTodos = (await allTodosResponse.json()) as ITodo[];
  const paths = allTodos.map((t) => ({ params: { id: t.id.toString() } }));

  return {
    fallback: true,
    paths: paths.slice(0, 5),
  };
};

export default TodoPage;
