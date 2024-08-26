package com.spo.app.services;

import com.spo.app.entity.WhatTuto;
import com.spo.app.entity.WhyTuto;

import java.util.List;

public interface IWhattutoService {

    List<WhatTuto> retrieveAllWhatTuto();
    public WhatTuto addWhatTuto (WhatTuto whatTuto);

    public WhatTuto updateWhatTuto(WhatTuto whatTuto);
}
