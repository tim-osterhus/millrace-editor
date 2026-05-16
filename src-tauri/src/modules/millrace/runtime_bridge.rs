#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum MillraceRuntimeMode {
    Fixture,
}

pub fn runtime_mode() -> MillraceRuntimeMode {
    MillraceRuntimeMode::Fixture
}
