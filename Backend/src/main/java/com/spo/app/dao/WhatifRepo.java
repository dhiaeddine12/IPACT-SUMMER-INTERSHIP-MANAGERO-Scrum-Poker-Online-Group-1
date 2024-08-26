package com.spo.app.dao;

import com.spo.app.entity.Whatif;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhatifRepo extends MongoRepository<Whatif,String> {
}
