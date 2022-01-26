package com.babulens.weighbridge.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Setting implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private String id;
	@Column(name = "SQNO")
	private String key;
	@Column(name = "_VALUE")
	private String value;
	private String profile;

	public Setting() {
	}

	public Setting(String key, Object value, String profile) {
		this.key = key;
		this.value = value.toString();
		this.profile = profile;
		this.id = profile + "_" + key;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value.toString();
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Setting setting = (Setting) o;
		return Objects.equals(key, setting.key) &&
				       Objects.equals(profile, setting.profile);
	}

	@Override
	public int hashCode() {
		return Objects.hash(key, profile);
	}
}
