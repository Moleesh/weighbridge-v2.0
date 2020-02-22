package com.babulens.weighbridge.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Settings implements Serializable {
	@Id
	private String id;
	private String key;
	private String value;
	@ManyToOne
	private Profile profile;

	public Settings() {
	}

	public Settings(String key, String value, Profile profile) {
		this.key = key;
		this.value = value;
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

	public void setValue(String value) {
		this.value = value;
	}

	public void setValue(Object value) {
		this.value = value.toString();
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Settings settings = (Settings) o;
		return Objects.equals(key, settings.key) &&
				       Objects.equals(profile, settings.profile);
	}

	@Override
	public int hashCode() {
		return Objects.hash(key, profile);
	}
}
