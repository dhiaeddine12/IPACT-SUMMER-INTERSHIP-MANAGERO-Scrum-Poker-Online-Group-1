package com.spo.app.dao;

import com.spo.app.entity.WhatTuto;
import com.spo.app.entity.WhyTuto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Repository
public interface WhytutoRepository extends MongoRepository<WhyTuto,String> {
}
