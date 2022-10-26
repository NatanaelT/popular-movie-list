import axios from 'axios';
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MovieList } from '../src/components/Movies/MovieList';

export default function Home() {

  return (
    <MovieList />
  )
}
