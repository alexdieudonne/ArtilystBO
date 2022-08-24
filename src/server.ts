import express from 'express';
import payload from 'payload';
import app from './app';
import { NotFoundError } from './core/ApiError';

app.on('error', (err)=>{console.log(err)});
app.on('listening', (err)=>{console.log("err")});

app.listen(3000);


