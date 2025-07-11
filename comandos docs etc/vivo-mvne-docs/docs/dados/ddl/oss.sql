CREATE TABLE device_model (
    "hash" CHAR(32) NOT NULL,
    model VARCHAR(128),
    tac VARCHAR(128),
    code VARCHAR(128),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT pk_device_model PRIMARY KEY ("hash"),
    CONSTRAINT ck_device_identifier CHECK (
        (tac IS NOT NULL AND code IS NULL AND model IS NULL) OR
        (code IS NOT NULL AND tac IS NULL AND model IS NULL) OR
        (model IS NOT NULL AND tac IS NULL AND code IS NULL)
    )
);
CREATE INDEX idx_device_tac ON device(tac);
CREATE INDEX idx_model ON device(model);
CREATE INDEX idx_code ON device(code);

CREATE TABLE phone_number (
    msisdn CHAR(11) NOT NULL,
    origin VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    assigned_at TIMESTAMP,
    updated_at TIMESTAMP,
    assigned_sim_id UUID,
    
    CONSTRAINT pk_msisdn PRIMARY KEY (msisdn),
    CONSTRAINT fk_phone_number_sim FOREIGN KEY (assigned_sim_id) REFERENCES sim(id)
);
CREATE INDEX idx_phone_number_sim ON phone_number(assigned_sim_id);

CREATE TABLE preview (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    external_id VARCHAR(64) NOT NULL,
    reserved_msisdn CHAR(11) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT pk_preview PRIMARY KEY (id)
);

CREATE TABLE preview_number (
    preview_id UUID NOT NULL,
    msisdn CHAR(11) NOT NULL,
    index INTEGER NOT NULL,
    
    CONSTRAINT pk_preview_number PRIMARY KEY (preview_id, msisdn),
    CONSTRAINT fk_preview_number_preview FOREIGN KEY (preview_id) REFERENCES preview(id)
);
CREATE INDEX idx_preview_number_msisdn ON preview_number(msisdn);

CREATE TABLE sim (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    iccid VARCHAR(64) NOT NULL,
    carrier_id UUID NOT NULL,
    line_id UUID NOT NULL,
    vivo_imsi VARCHAR(64) NOT NULL,
    sim_type VARCHAR(16) NOT NULL,
    technology VARCHAR(16) NOT NULL,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    
    CONSTRAINT pk_sim PRIMARY KEY (id),
    CONSTRAINT fk_sim_carrier FOREIGN KEY (carrier_id) REFERENCES bss_core.carrier(id),
    CONSTRAINT fk_sim_line FOREIGN KEY (line_id) REFERENCES bss_core.line(id)
);
CREATE INDEX idx_sim_iccid ON sim(iccid);
CREATE INDEX idx_sim_line_id ON sim(line_id);
CREATE INDEX idx_sim_vivo_imsi ON sim(vivo_imsi);

CREATE TABLE sim_card (
    sim_id UUID NOT NULL,
    hrs_imsi VARCHAR(64),
    delivery_address_hash CHAR(32) NOT NULL,
    
    CONSTRAINT pk_sim_card PRIMARY KEY (sim_id),
    CONSTRAINT fk_sim_card_sim FOREIGN KEY (sim_id) REFERENCES sim(id),
    CONSTRAINT fk_sim_card_address FOREIGN KEY (delivery_address_hash) REFERENCES bss_core.address("hash")
);

CREATE TABLE esim (
    sim_id UUID NOT NULL,
    matching_id VARCHAR(64),
    smdp_plus_address VARCHAR(128),
    device_model_hash CHAR(32) NOT NULL,
    
    CONSTRAINT pk_esim PRIMARY KEY (sim_id),
    CONSTRAINT fk_esim_sim FOREIGN KEY (sim_id) REFERENCES sim(id),
    CONSTRAINT fk_esim_device FOREIGN KEY (device_model_hash) REFERENCES device_model("hash")
);
CREATE INDEX idx_esim_matching_id ON esim(matching_id);

CREATE TABLE location_ddd (
    location_cnl INTEGER NOT NULL,
    ddd CHAR(2) NOT NULL,

    CONSTRAINT location_ddd PRIMARY KEY (location_cnl),
);
CREATE INDEX idx_location_ddd ON location_ddd(ddd);
