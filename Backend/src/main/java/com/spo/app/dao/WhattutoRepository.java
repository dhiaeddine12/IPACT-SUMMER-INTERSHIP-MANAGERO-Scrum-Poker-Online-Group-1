package com.spo.app.dao;

import com.spo.app.entity.Project;
import com.spo.app.entity.WhatTuto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Repository
public interface WhattutoRepository extends MongoRepository<WhatTuto,String> {
}
