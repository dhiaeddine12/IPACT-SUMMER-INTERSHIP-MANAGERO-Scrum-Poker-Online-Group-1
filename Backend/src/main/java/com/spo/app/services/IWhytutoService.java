package com.spo.app.services;

import com.spo.app.entity.WhyTuto;

import java.util.List;

public interface IWhytutoService {

    List<WhyTuto> retrieveAllWhyTuto();
    public WhyTuto addWhyTuto (WhyTuto whyTuto);

    public WhyTuto updateWhyTuto(WhyTuto whyTuto);

    void deleteWhyTuto(String  id);
}
